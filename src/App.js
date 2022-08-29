import React from 'react';
import './App.css';

// DESTRUCTURE useState from React
const { useState } = React

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// INSERTS target="_blank" INTO HREF TAGS(required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

// PLACEHOLDER FOR TEXT EDITOR
const placeholder = `
![](https://www.fullstackpython.com/img/logos/react.png)

# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function checkIfEqual(x,y) {
  if (x == y) {
    return equal;
  }else{
    return not equal;
  }
}
\`\`\`

text **bold**...
Or _italic_.
Italic and Bold text combine... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

Here are some of my work [links](https://codepen.io/your-work/), and
> Block Quotes!

And if you want to get really crazy, even tables:

Table 

Column | Column | Column
------------ | ------------- | -------------
Row | Row | Row
Row | Row | Row

Bullet List
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

Numbered List
1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

`;
// MAIN COMPONENT
function App() {
  // STATE
  const [setting, setSetting] = useState({
    markdown : placeholder,
    editorMaximized : false,
    previewerMaximized : false
  }) ;
  // EVENTS
  const handleChange = (e) => {
    setSetting(previousState => {
      return {...previousState, markdown : e.target.value}
    });
  }

  return (
    <div className='flex'>
      <div className="editorWrap">
        <h1>Editor</h1>
        <Editor markdown={setting.markdown} onChange={handleChange}/>
      </div>
      <div className="previewWrap">
        <Preview markdown={setting.markdown} />
      </div>
    </div>
  );
}
// TEXTEDITOR COMPONENT
const Editor = props => {
  return (
    <textarea id="editor" onChange={props.onChange} type="text" value={props.markdown}/>
  )
}
// PREVIEW COMPONENT
const Preview = props => {
  return (
    <div 
    dangerouslySetInnerHTML={{
      __html: marked(props.markdown, {renderer: renderer})
    }}
    id="preview"
    />
  );
};


export default App;