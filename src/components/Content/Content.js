import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import {
  DetailsList,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { useService } from "use-service";
import { ActionBar } from "../ActionBar/ActionBar";
import "./Content.css";
import { Modal } from "../Modal";
import { renderURL } from "./URLCell";

const COLUMNS = [
  {
    key: "method",
    name: "Method",
    maxWidth: 16,
    data: "string",
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    // onColumnClick: this._onColumnClick,
    onRender: renderURL,
  },
  {
    key: "url",
    name: "URL",
    data: "string",
    maxWidth: 100,
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    onRender: item => {
      const url = new URL(item.request.url);
      const name = url.pathname
        .split("/")
        .filter(Boolean)
        .pop();
      return <span title={item.request.url}> {name} </span>;
    }
  },
  {
    key: "status",
    name: "Status",
    data: "string",
    maxWidth: 16,
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    onRender: item => {
      return <span> {item.response.status} </span>;
    }
  },
  {
    key: "type",
    name: "Type",
    data: "string",
    maxWidth: 16,
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    onRender: item => {
      return <span>{item.response.content.mimeType}</span>;
    }
  }
];

export function Content(props) {
  const $har = useService("$har");
  const [invoked, setInvoked] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [selection] = React.useState(
    new Selection({
      onSelectionChanged: () => {
        setSelected(selection.getSelection());
      }
    })
  );
  const current = $har.current;
  if (!current) {
    return (
      <Stack horizontalAlign="baseline" className="content introduction">
        <h1>Welcome to HAR Editor </h1> <h2> What is HAR </h2>
        <p>

          HAR stands for HTTP Archive format.It is a JSON based for logging web
          browser interaction on a site.Source:
          <a href="https://en.wikipedia.org/wiki/.har"> Wikipedia </a>.
        </p>
        <h2> Why an editor ? </h2>
        <p>

          To help me to create, edit and merge HAR files before use them in har
          - express.
        </p>
        <h2> How to use ? </h2>
        <p>

          Start by drop an HAR file in the box on the left and discover all the
          features.
        </p>
        <h2> Some links HAR </h2>
        <ul>
          <li>

            <a href="http://www.softwareishard.com/blog/har-12-spec/"> Spec </a>
          </li>
          <li>

            <a href="https://github.com/toutpt/har-express"> har - express </a>
          </li>
          <li>

            <a href="http://www.softwareishard.com/blog/har-adopters/">

              HAR Adopters
            </a>
          </li>
          <li>

            <a href="https://toolbox.googleapps.com/apps/har_analyzer/">

              HAR Analyser
            </a>
          </li>
        </ul>
      </Stack>
    );
  }
  const items = current.parsed.log.entries;

  return (
    <Stack className="content" style={{ width: '100%' }}>
      <ActionBar selection={selected} />
      <MarqueeSelection selection={selection} isDraggingConstrainedToRoot>
        <DetailsList
          selection={selection}
          items={items}
          columns={COLUMNS}
          className="list"
          onItemInvoked={item => setInvoked(item)}
          selectionMode={SelectionMode.multiple}
        />
      </MarqueeSelection>
      {invoked && (
        <Modal
          titleAriaId={invoked.name}
          isOpen
        >
          <Modal.Header>
            <h4>{invoked.request.method}: {invoked.request.url}</h4>
          </Modal.Header>
          <pre className="pre">{JSON.stringify(invoked, null, 2)}</pre>
          <Modal.Footer>
            <DefaultButton onClick={() => setInvoked(false)} text="Close" />
          </Modal.Footer>
        </Modal>
      )}
    </Stack>
  );
}
