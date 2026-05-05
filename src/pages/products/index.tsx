import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LuRefreshCw, LuSearch } from "react-icons/lu";
import ProductGridCard from "../../components/products-card/product-grid-card";
import { useProductsByCategory } from "../../hooks/use-products-by-category";
import { useProductCategories } from "../../hooks/use-product-categories";
import styles from "./products-page.module.css";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { products, total } = useProductsByCategory(activeCategory, 100);
  const categories = useProductCategories();
  const options = [{ slug: "all", name: "All Categories" }, ...categories];

  return (
    <div className="p-3 d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-end gap-2 flex-wrap">
        <div className={`${styles.inputGroup} bg-card-custom border-custom d-flex align-items-center gap-2 px-2 rounded-3`}>
          <span className="d-flex align-items-center flex-shrink-0 text-secondary-custom">
            <LuSearch size={14} />
          </span>
          <input
            type="text"
            className={`${styles.searchInput} form-control border-0 bg-transparent p-0 text-primary-custom`}
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button
            className="d-flex align-items-center flex-shrink-0 border-0 bg-transparent p-0 text-secondary-custom"
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <LuRefreshCw size={13} />
          </button>
        </div>

        <div className={`${styles.inputGroup} bg-card-custom border-custom d-flex align-items-center px-2 rounded-3`}>
          <select
            className={`${styles.categorySelect} border-0 bg-transparent p-0 text-primary-custom`}
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {options.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Row className="g-0">
        <Col xs={12}>
          <ProductGridCard products={products} total={total} pageSize={12} searchQuery={query} />
        </Col>
      </Row>
    </div>
  );
}
