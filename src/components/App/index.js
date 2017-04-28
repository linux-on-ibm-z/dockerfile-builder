import { connect } from "cerebral/react";
import React from "react";

import CodeEditor2 from "../CodeMirror";
import CodeEditor from "../Monaco";

import { default as GrommetApp } from "grommet/components/App";
import Headline from "grommet/components/Headline";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Image from "grommet/components/Image";
import Article from "grommet/components/Article";
import Section from "grommet/components/Section";

import logo from "./logo.svg";

// eslint-disable-next-line import/no-webpack-loader-syntax
import placeholder from "!raw!./placeholder.svg";

function placeholderImage(width, height) {
  // We need to base64 encode this because otherwise FF will add extra escape chars
  const dataUri = btoa(placeholder.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim());
  console.log("data:image/svg+xml;base64," + dataUri);
  return "data:image/svg+xml;base64," + dataUri;
}

export default connect({}, function App({ counts }) {
  return (
    <div id={"app-wrapper"}>
      <GrommetApp centered={true}>
        <Header fixed={true} size={"large"}>
          <Title responsive={true}>
            <Image src={logo} size={"thumb"} align={"left"} fit={"contain"} />
            Sample Title
          </Title>
        </Header>
        <Article>
          <Section pad={"large"} justify={"center"} align={"center"}>
            <Headline margin={"none"}>
              CodeMirror
            </Headline>
          </Section>
          <CodeEditor2 />
        </Article>
        <Section>
          <CodeEditor />
        </Section>
      </GrommetApp>
    </div>
  );
});
