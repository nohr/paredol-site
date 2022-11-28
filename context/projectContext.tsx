//
export function useProjectContext() {
  const { project, searchParams } = useContext(ProjectContext);
  return { project, searchParams };
}
