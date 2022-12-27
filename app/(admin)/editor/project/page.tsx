"use client";

import React, { useState } from "react";
// import { useSnapshot } from "valtio";
import { EditorProvider } from "../../../../common/editor.context";
// import { state } from "../../../../common/state";
import { ContentPage } from "./form.style";
// import { ProjectEditor } from "./project.form";

function ProjectForm() {
  // const { mobile } = useSnapshot(state);
  const [saved, setSaved] = useState(false);

  return (
    <ContentPage>
      <div className="formWrap">
        {/* {saved ? (
          <>
            <p>Changes Saved!</p>
            <button onClick={() => setSaved(false)}>Post Again</button>
          </>
        ) : (
          <ProjectEditor setSaved={setSaved} />
        )} */}
      </div>
      {/* {!mobile && <Preview />} */}
    </ContentPage>
  );
}
export default function EditPostsPage() {
  return (
    <EditorProvider>
      <h3>edit posts</h3>
      <ProjectForm />
    </EditorProvider>
  );
}
