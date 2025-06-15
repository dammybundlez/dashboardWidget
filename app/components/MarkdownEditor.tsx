import React from 'react'
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

type Props = {
    value : string,
    onChange : ( value : string) => void;
}

const MarkdownEditor = ({ value , onChange } : Props ) => {
  return (
    <SimpleMDE
      value={value}
      onChange={onChange}
      options={{
        placeholder: 'Write your markdown...',
        spellChecker: false,
        minHeight: '150px',
      }}
    />
  );
}

export default MarkdownEditor
