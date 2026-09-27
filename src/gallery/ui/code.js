// The gallery's code views, built on CodeMirror. A styles file is shown whole, as it is written, and only the CSS
// inside its template strings can be edited: every other part (the exports, a theme object) stays as it is.
// A chart file is shown read-only. Both are highlighted the same way, CSS included.
import { EditorState, StateField, RangeSetBuilder } from "@codemirror/state";
import { EditorView, Decoration, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle, bracketMatching, indentUnit } from "@codemirror/language";
import { javascriptLanguage, jsxLanguage } from "@codemirror/lang-javascript";
import { cssLanguage } from "@codemirror/lang-css";
import { parseMixed } from "@lezer/common";
import { tags as t } from "@lezer/highlight";

// CSS inside a template string (`...`) is parsed as CSS, so it is highlighted as CSS.
const cssInTemplates = parseMixed((node) => (node.name === "TemplateString" ? { parser: cssLanguage.parser, overlay: [{ from: node.from + 1, to: node.to - 1 }] } : null));
const stylesLanguage = javascriptLanguage.configure({ wrap: cssInTemplates });
const chartLanguage = jsxLanguage.configure({ wrap: cssInTemplates });

// Colors from the docs' theme (Starlight's), so the code reads like the docs' code blocks, dark or light.
const c = (name) => `var(--sl-color-${name})`;
const palette = HighlightStyle.define([
  { tag: t.comment, color: c("gray-3"), fontStyle: "italic" },
  { tag: [t.keyword, t.modifier, t.controlKeyword, t.operatorKeyword, t.definitionKeyword, t.moduleKeyword], color: c("purple-high") },
  { tag: [t.definition(t.variableName), t.function(t.variableName), t.function(t.propertyName)], color: c("blue-high") },
  { tag: [t.string, t.special(t.string)], color: c("green-high") },
  { tag: [t.number, t.unit, t.color, t.bool, t.null], color: c("red-high") },
  { tag: [t.tagName, t.typeName], color: c("red-high") },
  { tag: t.className, color: c("orange-high") },
  { tag: t.attributeName, color: c("purple-high") },
  { tag: t.propertyName, color: c("blue-high") },
  { tag: t.variableName, color: c("white") },
  { tag: [t.special(t.variableName), t.self], color: c("purple-high") },
  { tag: [t.operator, t.punctuation, t.bracket, t.separator, t.derefOperator], color: c("gray-3") },
  { tag: [t.labelName, t.constant(t.name)], color: c("orange-high") },
  { tag: t.invalid, color: c("red") },
]);

const look = EditorView.theme({
  "&": { color: c("white"), backgroundColor: "transparent", fontSize: "14px" },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": { fontFamily: "var(--sl-font-mono, var(--sl-font-system-mono))", lineHeight: "1.65" },
  ".cm-content": { padding: "14px 0", caretColor: c("white") },
  ".cm-line": { padding: "0 16px 0 10px" },
  // a styles file wraps its long lines, each continuation indented under the rule it belongs to
  "&.cm-wrap .cm-line": { paddingLeft: "calc(10px + 2ch)", textIndent: "-2ch" },
  ".cm-gutters": { backgroundColor: "transparent", color: c("gray-4"), border: "none", paddingLeft: "8px" },
  ".cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--sl-color-white) 4%, transparent)" },
  "&:not(.cm-focused) .cm-activeLine": { backgroundColor: "transparent" }, // only while editing
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: c("white"), borderLeftWidth: "2px" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "color-mix(in srgb, var(--sl-color-accent-high) 30%, transparent) !important" },
  ".cm-matchingBracket": { backgroundColor: "color-mix(in srgb, var(--sl-color-blue-high) 18%, transparent)", outline: "none" },
  // the lines of CSS that can be edited: a faint sand tint and a sand band down their left
  ".cm-line.cm-editable": { backgroundColor: "color-mix(in srgb, var(--sl-color-accent-high) 7%, transparent)", boxShadow: "inset 2px 0 0 var(--sl-color-accent-high)" },
  "&.cm-focused .cm-line.cm-editable.cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--sl-color-accent-high) 13%, transparent)" },
  "&:not(.cm-focused) .cm-line.cm-editable.cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--sl-color-accent-high) 7%, transparent)" },
});

const base = [lineNumbers(), drawSelection(), bracketMatching(), syntaxHighlighting(palette), look, indentUnit.of("  "), EditorState.tabSize.of(2)];

/** A read-only view of a chart file. */
export function showCode(parent, text) {
  return new EditorView({ parent, state: EditorState.create({ doc: text, extensions: [...base, chartLanguage, EditorState.readOnly.of(true), EditorView.editable.of(false)] }) });
}

// Where the editable CSS is: the inside of each `export const name = `…``, found in the text as it is now.
const CSS = /export const (\w+) = `([^`]*)`/g;
export function cssParts(text) {
  return [...text.matchAll(CSS)].map((m) => ({ name: m[1], from: m.index + m[0].indexOf("`") + 1, to: m.index + m[0].length - 1, css: m[2] }));
}

/**
 * An editor for a styles file: its CSS can be edited, nothing else can. onCss(name, css) runs after each change with the
 * CSS of each export that changed. A change outside the CSS, or one that types a backtick (it would end the string), is refused.
 */
export function editStyles(parent, text, onCss) {
  // The editable ranges, carried through every change: text typed at either end stays inside.
  const ranges = StateField.define({
    create: (state) => cssParts(state.doc.toString()).map(({ from, to }) => ({ from, to })),
    update: (rs, tr) => (tr.docChanged ? rs.map((r) => ({ from: tr.changes.mapPos(r.from, -1), to: tr.changes.mapPos(r.to, 1) })) : rs),
    provide: (f) => EditorView.decorations.compute([f], (state) => {
      const b = new RangeSetBuilder(), line = Decoration.line({ class: "cm-editable" });
      for (const r of state.field(f)) {
        // every line the CSS covers, except the ones the backticks sit on when the CSS starts or ends at a line break
        let from = state.doc.lineAt(r.from), to = state.doc.lineAt(r.to);
        if (r.from === from.to && from.number < to.number) from = state.doc.line(from.number + 1);
        if (r.to === to.from && to.number > from.number) to = state.doc.line(to.number - 1);
        for (let n = from.number; n <= to.number; n++) b.add(state.doc.line(n).from, state.doc.line(n).from, line);
      }
      return b.finish();
    }),
  });
  const onlyCss = EditorState.changeFilter.of((tr) => {
    const rs = tr.startState.field(ranges);
    let ok = true;
    tr.changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
      if (!rs.some((r) => r.from <= fromA && toA <= r.to) || inserted.toString().includes("`")) ok = false;
    });
    return ok;
  });
  let last = Object.fromEntries(cssParts(text).map((p) => [p.name, p.css]));
  const report = EditorView.updateListener.of((u) => {
    if (!u.docChanged) return;
    for (const p of cssParts(u.state.doc.toString())) if (last[p.name] !== p.css) { last[p.name] = p.css; onCss(p.name, p.css); }
  });
  const view = new EditorView({
    parent,
    state: EditorState.create({ doc: text, extensions: [...base, stylesLanguage, EditorView.lineWrapping, EditorView.editorAttributes.of({ class: "cm-wrap" }),
      history(), highlightActiveLine(), keymap.of([...defaultKeymap, ...historyKeymap]), ranges, onlyCss, report] }),
  });
  parent.editor = view; // for tools and tests (scripts/check-styles.mjs): the editor shows only the lines in view
  return view;
}

/** Puts each export's CSS back as it is in `text`, in one change that undo can take back. */
export function resetStyles(view, text) {
  const was = Object.fromEntries(cssParts(text).map((p) => [p.name, p.css]));
  const changes = cssParts(view.state.doc.toString()).filter((p) => p.name in was && p.css !== was[p.name]).map((p) => ({ from: p.from, to: p.to, insert: was[p.name] }));
  if (changes.length) view.dispatch({ changes });
}
