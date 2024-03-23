const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ margin: "20px auto", display: "block" }}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
