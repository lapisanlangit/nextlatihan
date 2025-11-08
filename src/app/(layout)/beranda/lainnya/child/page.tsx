export default function Child(props: any) {
  const handleClick = () => {
    props.onChildAction("Data from child!");
  };
  return (
    <div>
      <p>Child Component: {props.data}</p>

      <button onClick={handleClick}>Send Data to Parent</button>
    </div>
  );
}
