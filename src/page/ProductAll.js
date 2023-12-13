import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getProducts = async () => {
    const searchQuery = query.get("q") || "";
    console.log(searchQuery);
    // 값에서는 q라는 아이다값과 일치가 되어지는 값을 넣는다. 그리고 경로에 쿼리스트링값으로 넣어주면 일치하는 값을 찾아준다.
    const url = ` https://my-json-server.typicode.com/mayminzz/shopping-musinsa/products?q=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setProductList(data);
  };
  useEffect(() => {
    getProducts();
  }, [query]);
  // getProduct라는 함수는 쿼리값이 변경할때마다 계속 바뀌어지게끔
  return (
    <Container>
      <Row>
        {productList.map((menu, index) => (
          <Col lg={3} key={index}>
            <ProductCard item={menu} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
