import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import {
  DetailsList,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { useService } from "use-service";
import { ActionBar } from "../ActionBar/ActionBar";
import "./Content.css";

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
    onRender: item => {
      return <span>{item.request.method}</span>;
    }
  },
  {
    key: "url",
    name: "URL",
    data: "string",
    maxWidth: 16,
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    onRender: item => {
      const url = new URL(item.request.url);
      const name = url.pathname
        .split("/")
        .filter(Boolean)
        .pop();
      return <span title={item.request.url}>{name}</span>;
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
      return <span>{item.response.status}</span>;
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
      return <span>{item._resourceType}</span>;
    }
  }
];


export function Content(props) {
  const $har = useService("$har");
  const [selected, setSelected] = React.useState([]);
  const [selection] = React.useState(new Selection({
    onSelectionChanged: () => {
      setSelected(selection.getSelection());
    }
  }));
  const current = $har.current;
  if (!current) {
    return (
      <Stack horizontalAlign="center" className="content">
        <MessageBar messageBarType={MessageBarType.warning}>
          <i className="fa fa-warning" />
          No content to display.
        </MessageBar>
      </Stack>
    );
  }
  const items = current.parsed.log.entries;

  return (
    <Stack className="content">
      <ActionBar selection={selected} />
      <MarqueeSelection
        selection={selection}
        isDraggingConstrainedToRoot
      >
        <DetailsList
          selection={selection}
          items={items}
          columns={COLUMNS}
          className="list"
          selectionMode={SelectionMode.multiple}
        />
      </MarqueeSelection>
      {/* <pre className="pre">{JSON.stringify(current.parsed, null, 2)}</pre> */}
    </Stack>
  );
}
