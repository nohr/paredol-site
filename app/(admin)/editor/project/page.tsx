"use client";

import React, { useContext } from "react";
import { useSnapshot } from "valtio";
import { EditorContext, EditorProvider } from "@context/editor.context";
import { state } from "state";
import { ProjectEditorForm } from "@ui/editor/project/project.form";
import ProjectEditorPreview from "@ui/editor/project/project.preview";

function ProjectEditor() {
  const { mobile } = useSnapshot(state);
  const { saved, setSaved } = useContext(EditorContext);

  return (
    <div className=" flex h-fit w-full flex-col items-center justify-start bg-transparent md:flex-row">
      <div className="mb-28 flex w-full flex-col items-center justify-start gap-x-5 md:mb-0 md:h-full md:w-fit md:resize-x md:overflow-y-scroll md:p-4">
        {saved ? (
          <>
            <p>Changes Saved!</p>
            <button onClick={() => setSaved(false)}>Post Again</button>
          </>
        ) : (
          <ProjectEditorForm />
        )}
      </div>
      {!mobile && <ProjectEditorPreview />}
    </div>
  );
}

export default function EditPostsPage() {
  return (
    <EditorProvider>
      <ProjectEditor />
    </EditorProvider>
  );
}
