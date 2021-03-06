import React from "react";
import { Nav, TeachingBubble, Icon } from "office-ui-fabric-react";
import { Label } from 'office-ui-fabric-react/lib/Label';
import Dropzone from "react-dropzone";
import "./Menu.css";
import { useService } from "use-service";

const HELP_KEY = 'har-editor-help';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function Menu(props) {
  const $har = useService("$har");
  const [uploadEl, setEl] = React.useState();
  const [hideHelp, setHideHelp] = React.useState(localStorage.getItem(HELP_KEY));
  const dismissHelp = () => {
    localStorage.setItem(HELP_KEY, 'true');
    setHideHelp(true);
  }
  const exportedHAR = $har.export();
  const actions = {
    name: 'Actions',
    links: [],
  };
  const hars = {
    name: "HARs",
    initialSelectedKey: $har.current && $har.current.name,
    links: $har.files.map(f => {
      const res = {
        key: f.name,
        name: f.name,
        onClick: () => $har.select(f)
      };
      if (f.isValid) {
      } else {
      }
      return res;
    })
  };
  const hasHARs = hars.links.length > 0;
  if (hasHARs) {
    actions.links.push({
      key: 'export',
      name: 'Export',
      onClick: () => {
        var content = JSON.stringify(exportedHAR);
        const filename = `har-editor-export-${Date.now()}.har`;
        download(filename, content);
      },
      icon: 'Download',
    });
  }
  const navgroups = [
    hars,
    actions,
  ];

  
  const examplePrimaryButton = {
    children: 'OK got it',
    onClick: dismissHelp
  };
  const exampleSecondaryButtonProps = {
    children: 'Learn more',
    href: 'http://www.softwareishard.com/blog/har-12-spec/',
    
  };
  return (
    <div className="menu flex">
      <Nav styles={{ root: { width: 300 } }} groups={navgroups} />
      <Dropzone onDrop={acceptedFiles => $har.addFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="upload" ref={setEl}>
            <div {...getRootProps()} className="upload-wrapper">
              <Label required htmlFor="upload-har">Upload</Label>
              <input {...getInputProps()} id="upload-har" />
              <Icon className="ms-Icon" iconName="Upload" />
            </div>
          </section>
        )}
      </Dropzone>
      {uploadEl && !hideHelp && <TeachingBubble
          target={uploadEl}
          primaryButtonProps={examplePrimaryButton}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={() => dismissHelp()}
          headline="You can drag and drop HAR file here"
        >
          HAR files are generated by devtools in network tabs.
      </TeachingBubble>}
    </div>
  );
}
