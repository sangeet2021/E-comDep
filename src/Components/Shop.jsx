import { forwardRef, useState } from "react";
import useFetch from "../Hooks/useFetch";
import ShopList from "./ShopList";
import Modal from "./Modal";
import { currencyFormatter } from "../utils/fotmatter";

const Shop = forwardRef((props, ref) => {
  const { data, error, isPending } = useFetch("/db.json", []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Conditional rendering to ensure data is an array before attempting to map over it
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="shop-page" ref={ref}>
      <div className="sub-shop">
        <h1>Browse Products</h1>

        <ul className="shop-list">
          {/* Check if data is an array and has elements before using map */}
          {data.shoes && data.shoes.length > 0 ? (
            data.shoes.map((item) => (
              <ShopList
                key={item.id || item.name}
                data={item}
                onItemClick={() => handleItemClick(item)}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </div>
      {selectedItem && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div className="selected-item">
            <img src={selectedItem.image_url} alt={selectedItem.name} />
            <div className="subselect">
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <p>Price: {currencyFormatter.format(selectedItem.price)}</p>
              <p>Sizes: {selectedItem.sizes.join(", ")}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
});

export default Shop;
