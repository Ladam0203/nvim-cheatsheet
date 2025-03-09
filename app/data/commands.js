export const commands = [
    // Motions
    { id: "h", command: "h", description: "Move cursor left", category: "motions", mode: "normal" },
    { id: "j", command: "j", description: "Move cursor down", category: "motions", mode: "normal" },
    { id: "k", command: "k", description: "Move cursor up", category: "motions", mode: "normal" },
    { id: "l", command: "l", description: "Move cursor right", category: "motions", mode: "normal" },
    { id: "w", command: "w", description: "Jump to start of next word", category: "motions", mode: "normal" },
    { id: "b", command: "b", description: "Jump to start of previous word", category: "motions", mode: "normal" },
    { id: "e", command: "e", description: "Jump to end of word", category: "motions", mode: "normal" },
    { id: "0", command: "0", description: "Jump to start of line", category: "motions", mode: "normal" },
    { id: "^", command: "^", description: "Jump to first non-blank character of line", category: "motions", mode: "normal" },
    { id: "$", command: "$", description: "Jump to end of line", category: "motions", mode: "normal" },
    { id: "g_", command: "g_", description: "Jump to last non-blank character of line", category: "motions", mode: "normal" },
    { id: "gg", command: "gg", description: "Go to first line of document", category: "motions", mode: "normal" },
    { id: "G", command: "G", description: "Go to last line of document", category: "motions", mode: "normal" },
    { id: "f{char}", command: "f{char}", description: "Jump to next occurrence of character", category: "motions", mode: "normal" },
    { id: "F{char}", command: "F{char}", description: "Jump to previous occurrence of character", category: "motions", mode: "normal" },
    { id: "t{char}", command: "t{char}", description: "Jump to before next occurrence of character", category: "motions", mode: "normal" },
    { id: "T{char}", command: "T{char}", description: "Jump to after previous occurrence of character", category: "motions", mode: "normal" },
    { id: "{", command: "{", description: "Jump to previous paragraph", category: "motions", mode: "normal" },
    { id: "}", command: "}", description: "Jump to next paragraph", category: "motions", mode: "normal" },
    { id: "Ctrl-d", command: "Ctrl-d", description: "Move down half a page", category: "motions", mode: "normal" },
    { id: "Ctrl-u", command: "Ctrl-u", description: "Move up half a page", category: "motions", mode: "normal" },
    { id: "Ctrl-f", command: "Ctrl-f", description: "Move down one page", category: "motions", mode: "normal" },
    { id: "Ctrl-b", command: "Ctrl-b", description: "Move up one page", category: "motions", mode: "normal" },
    { id: "H", command: "H", description: "Move to top of screen", category: "motions", mode: "normal" },
    { id: "M", command: "M", description: "Move to middle of screen", category: "motions", mode: "normal" },
    { id: "L", command: "L", description: "Move to bottom of screen", category: "motions", mode: "normal" },
    { id: "Ctrl-o", command: "Ctrl-o", description: "Jump to older cursor position", category: "motions", mode: "normal" },
    { id: "Ctrl-i", command: "Ctrl-i", description: "Jump to newer cursor position", category: "motions", mode: "normal" },

    // Editing
    { id: "i", command: "i", description: "Insert mode at cursor", category: "editing", mode: "normal" },
    { id: "I", command: "I", description: "Insert at beginning of line", category: "editing", mode: "normal" },
    { id: "a", command: "a", description: "Append after cursor", category: "editing", mode: "normal" },
    { id: "A", command: "A", description: "Append at end of line", category: "editing", mode: "normal" },
    { id: "o", command: "o", description: "Open new line below", category: "editing", mode: "normal" },
    { id: "O", command: "O", description: "Open new line above", category: "editing", mode: "normal" },
    { id: "x", command: "x", description: "Delete character under cursor", category: "editing", mode: "normal" },
    { id: "dd", command: "dd", description: "Delete line", category: "editing", mode: "normal" },
    { id: "dw", command: "dw", description: "Delete word", category: "editing", mode: "normal" },
    { id: "yy", command: "yy", description: "Yank (copy) line", category: "editing", mode: "normal" },
    { id: "p", command: "p", description: "Paste after cursor", category: "editing", mode: "normal" },
    { id: "+p", command: "+p", description: "Paste from system clipboard", category: "editing", mode: "normal", remaps: ["<leader>p"] },
    { id: "P", command: "P", description: "Paste before cursor", category: "editing", mode: "normal" },
    { id: "u", command: "u", description: "Undo", category: "editing", mode: "normal" },
    { id: "Ctrl-r", command: "Ctrl-r", description: "Redo", category: "editing", mode: "normal" },
    { id: "ggVG", command: "ggVG", description: "Select all text in the file", category: "editing", mode: "normal" },

    // Commands
    { id: ":w", command: ":w", description: "Save file", category: "commands", mode: "command" },
    { id: ":q", command: ":q", description: "Quit", category: "commands", mode: "command" },
    { id: ":wq", command: ":wq", description: "Save and quit", category: "commands", mode: "command" },
    { id: ":q!", command: ":q!", description: "Quit without saving", category: "commands", mode: "command" },
    { id: ":%s/foo/bar/g", command: ":%s/foo/bar/g", description: "Replace all 'foo' with 'bar'", category: "commands", mode: "command" },
    { id: ":set number", command: ":set number", description: "Show line numbers", category: "commands", mode: "command" },
    { id: ":help", command: ":help", description: "Open help", category: "commands", mode: "command" },
    { id: ":e {path}", command: ":e {path}", description: "Open file in new buffer, switch to it. (Creates file if does not exist)", category: "commands", mode: "command" },

    // Coding
    { id: "gd", command: "gd", description: "Go to definition", category: "coding", mode: "normal" },
    { id: "gr", command: "gr", description: "Go to references", category: "coding", mode: "normal" },
    { id: "K", command: "K", description: "Show documentation", category: "coding", mode: "normal" },
    { id: "<leader>ca", command: "<leader>ca", description: "Code action", category: "coding", mode: "normal" },
    { id: "<leader>rn", command: "<leader>rn", description: "Rename symbol", category: "coding", mode: "normal" },
    { id: "[d", command: "[d", description: "Go to previous diagnostic", category: "coding", mode: "normal" },
    { id: "]d", command: "]d", description: "Go to next diagnostic", category: "coding", mode: "normal" },

    // Search
    { id: "/{text}", command: "/{text}", description: "Search forward for text", category: "search", mode: "normal" },
    { id: "?{text}", command: "?{text}", description: "Search backward for text", category: "search", mode: "normal" },
    { id: "n", command: "n", description: "Search next", category: "search", mode: "normal" },
    { id: "N", command: "N", description: "Search previous", category: "search", mode: "normal" },

    // Visual
    { id: "v", command: "v", description: "Start visual mode", category: "visual", mode: "normal" },
    { id: "V", command: "V", description: "Start linewise visual mode", category: "visual", mode: "normal" },
    { id: "Ctrl-v", command: "Ctrl-v", description: "Start blockwise visual mode", category: "visual", mode: "normal" },
    { id: "d", command: "d", description: "Delete selected text", category: "visual", mode: "visual" },
    { id: "y", command: "y", description: "Yank (copy) selected text", category: "visual", mode: "visual" },
    { id: "+y", command: "+y", description: "Copy selected text to system clipboard", category: "visual", mode: "visual", remaps: ["<leader>y"] },
    { id: ">", command: ">", description: "Indent selected text", category: "visual", mode: "visual" },
    { id: "<", command: "<", description: "Unindent selected text", category: "visual", mode: "visual" },
];

// Get all unique categories
export const getCategories = () => {
    const uniqueCategories = new Set(commands.map(cmd => cmd.category));
    return Array.from(uniqueCategories);
};
