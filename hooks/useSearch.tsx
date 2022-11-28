export function useSearch() {
  const { searchParams } = useContext(ProjectContext);
  return { searchParams };
}
