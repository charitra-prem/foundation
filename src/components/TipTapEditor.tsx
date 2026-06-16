import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export interface TipTapEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
  editable?: boolean;
  minHeight?: number;
  placeholder?: string;
}

function buildHtml(content: string, editable: boolean, placeholder: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; padding: 12px; }
    #editor { outline: none; min-height: 40px; }
    #editor p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #aaa;
      pointer-events: none;
      height: 0;
    }
    .ProseMirror:focus { outline: none; }
  </style>
</head>
<body>
  <div id="editor"></div>
  <script type="module">
    import { Editor } from 'https://esm.sh/@tiptap/core@2';
    import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2';
    import Placeholder from 'https://esm.sh/@tiptap/extension-placeholder@2';

    const editor = new Editor({
      element: document.querySelector('#editor'),
      editable: ${editable},
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: ${JSON.stringify(placeholder)} }),
      ],
      content: ${JSON.stringify(content)},
      onUpdate({ editor }) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'update',
          html: editor.getHTML(),
        }));
      },
    });

    window.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'setContent') editor.commands.setContent(msg.html, false);
        if (msg.type === 'setEditable') editor.setEditable(msg.editable);
      } catch (_) {}
    });
  </script>
</body>
</html>`;
}

export default function TipTapEditor({
  content = '',
  onUpdate,
  editable = true,
  minHeight = 120,
  placeholder = 'Start typing…',
}: TipTapEditorProps) {
  const webviewRef = useRef<WebView>(null);

  const html = buildHtml(content, editable, placeholder);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data);
        if (msg.type === 'update') onUpdate?.(msg.html);
      } catch (_) {}
    },
    [onUpdate],
  );

  return (
    <View style={[styles.container, { minHeight }]}>
      <WebView
        ref={webviewRef}
        source={{ html }}
        originWhitelist={['*']}
        onMessage={handleMessage}
        scrollEnabled={false}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
