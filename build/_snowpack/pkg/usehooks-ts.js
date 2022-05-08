import { r as react } from './common/index-ae389540.js';

function useCopyToClipboard() {
    const [copiedText, setCopiedText] = react.useState(null);
    const copy = async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        }
        catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);
            return false;
        }
    };
    return [copiedText, copy];
}

export { useCopyToClipboard };
