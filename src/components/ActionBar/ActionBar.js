import React from "react";
import { CommandBar } from "office-ui-fabric-react";
import { useService } from "use-service";

export function ActionBar(props) {
  const $har = useService("$har");
  const logs = $har.current.parsed.log;

  const commands = [
    {
      key: "reset",
      name: "Reset",
      iconProps: {
        iconName: "Undo"
      },
      onClick: () => $har.reset()
    }
  ];
  if (logs.entries.some(e => e._resourceType !== "xhr")) {
    commands.push({
      key: "mock-only",
      name: "Keep only XHR and fetch",
      iconProps: {
        iconName: "DeleteRows"
      },
      onClick: () => $har.prepareMock()
    });
  }
  if (props.selection && props.selection.count > 0) {
    commands.push({
      key: "multi-delete",
      name: "Delete",
      iconProps: {
        iconName: "Delete"
      },
      onClick: () => {}
    });
  }
  return <CommandBar items={commands} />;
}
