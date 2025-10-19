'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
    return (
        <Editor
            height="40vh" // Adjust height as needed
            language="typescript"
            theme="vs-dark"
            value={value}
            onChange={onChange}
            options={{
                minimap: { enabled: false },
            }}
        />
    );
};

export default CodeEditor;