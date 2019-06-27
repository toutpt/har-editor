import React from "react";
import { Stack } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
// import { Link } from 'office-ui-fabric-react/lib/Link';
// import { Label } from 'office-ui-fabric-react/lib/Label';
import { DetailsList, Selection } from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import "./Content.css";
import { useService } from "use-service";
import { ActionBar } from "../ActionBar/ActionBar";

const COLUMNS = [
  {
    key: "method",
    name: "Method",
    // className: classNames.fileIconCell,
    // iconClassName: classNames.fileIconHeaderIcon,
    // ariaLabel: 'Column operations for File type, Press to sort on File type',
    // iconName: 'Page',
    // isIconOnly: true,
    // fieldName: 'name',
    // minWidth: 16,
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
  const [selection, setSelection] = React.useState(new Selection({
    onSelectionChanged: () => {
      setSelection(Object.assign({}, selection));
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
      <ActionBar selection={selection} />
      <MarqueeSelection selection={selection}>
        <DetailsList selection={selection} items={items} columns={COLUMNS} className="list" />
      </MarqueeSelection>
      {/* <pre className="pre">{JSON.stringify(current.parsed, null, 2)}</pre> */}
    </Stack>
  );
}
