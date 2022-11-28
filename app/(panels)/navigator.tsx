type buttonProps = {
  panel: string;
};

const PanelButton = ({ panel }: buttonProps) => (
  <button onClick={() => console.log(panel)}>project</button>
);

export const Navigator = () => {
  return (
    <div className="navigator">
      <h1>Navigator</h1>
      <ul>
        <li>
          <a href="/info">Info</a>
        </li>
        <li>
          <a href="/shop">Shop</a>
        </li>
      </ul>
      <PanelButton panel="project" />
      <PanelButton panel="options" />
    </div>
  );
};
