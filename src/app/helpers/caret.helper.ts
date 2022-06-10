export function setCaret(el: Element): void {
    const focusedEl = el as HTMLElement;
    const selection = window.getSelection();
    const range = document.createRange();
    selection?.removeAllRanges();
    range.selectNodeContents(el);
    range.collapse(false);
    selection?.addRange(range);
    focusedEl.focus();
}
