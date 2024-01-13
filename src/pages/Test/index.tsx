import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import reactStringReplace from 'react-string-replace';
// import Iframe from 'react-iframe';
const Test = () => {
  const content = 'Hey my number is 555-555-5555.';
  const textWithLineBreaks = 'This is a text.\nIt has multiple lines.';
  const textWithUrls =
    'Visit my website at https://www.npmjs.com/package/react-string-replace  qwad http://localhost:5173/test';

  const iframe =
    '<iframe height="265" style="width: 100%;" scrolling="no" title="fx." src="//codepen.io/ycw/embed/JqwbQw/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href="https://codepen.io/ycw/pen/JqwbQw/">fx.</a> by ycw(<a href="https://codepen.io/ycw">@ycw</a>) on <a href="https://codepen.io">CodePen</a>.</iframe>';
  const [value, setValue] = React.useState('adasdasdasd\nádas');
  return (
    <div>
      {reactStringReplace(content, /(\d+)/g, (match, i) => (
        <span key={i} style={{ color: 'red' }}>
          {match}
        </span>
      ))}
      <br />
      {reactStringReplace(textWithUrls, /(https?:\/\/[^\s]+)/g, (match, i) => {
        // console.log(match);

        return (
          <a key={i} href={match} target="_blank" rel="noreferrer" className="underline">
            {match}
          </a>

          //   <React.Fragment key={i}>
          //     <a
          //       href={match}
          //       target="_blank"
          //       rel="noreferrer"
          //       onClick={(e) => {
          //         e.preventDefault();
          //         // handleLinkClick(match);
          //       }}
          //     >
          //       {match}
          //     </a>
          //     <iframe
          //       title={`iframe-${i}`}
          //       src={match}
          //       width="100%"
          //       height="400px"
          //       style={{ border: '1px solid #ccc' }}
          //     ></iframe>
          //   </React.Fragment>
        );
      })}
      {reactStringReplace(textWithUrls, /(https?:\/\/[^\s]+)/g, (match, i) => {
        // console.log(match);

        return (
          <>
            <br />
            {i}
            {match}
          </>
        );
      })}
      {/* <Iframe
        url="https://www.sdrive.app/embed/1ptBQD"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
      /> */}
      <br />
      <br />
      <br />
      {reactStringReplace(value, /(\n)/g, (_match, i) => (
        <React.Fragment key={i}>
          <br />
        </React.Fragment>
      ))}
      <Textarea
        placeholder="Tell us a little bit about yourself"
        className="resize-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        onClick={() => {
          console.log(JSON.stringify(value));
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default Test;
// function Iframe(props : any) {
//     return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
//   }
