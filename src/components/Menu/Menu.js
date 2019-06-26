import React from "react";
import { Nav } from "office-ui-fabric-react";
import Dropzone from "react-dropzone";
import "./Menu.css";
import { useService } from "use-service";

export function Menu(props) {
  const $har = useService("$har");
  const navgroups = [
    {
      name: "HARs",
      initialSelectedKey: $har.current.name,
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
    }
  ];
  const hasHARs = navgroups[0].links.length > 0;
  return (
    <div className="menu flex">
      <p className="help-text">Please upload your HAR file here</p>
      {hasHARs && <Nav styles={{ root: { width: 300 } }} groups={navgroups} />}
      <Dropzone onDrop={acceptedFiles => $har.addFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="upload">
            <div {...getRootProps()} className="upload-wrapper">
              <input {...getInputProps()} />
              <i className="fa fa-upload" />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}
