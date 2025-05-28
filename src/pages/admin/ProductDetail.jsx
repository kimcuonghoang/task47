import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductDetail } from "../../api/productApi";

const ProductDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductDetail(id);
      setTodo(res);
    };
    fetchData();
  }, [id]);

  if (!todo) return <div className="text-center">Loading ...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chi tiết Todo</h2>
      <p>
        <strong>Tiêu đề:</strong> {todo.title}
      </p>
      <p>
        <strong>Mô tả:</strong> {todo.description}
      </p>
      <p>
        <strong>Ưu tiên:</strong> {todo.priority}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
      </p>
      <p>
        <strong>Ngày tạo:</strong> {todo.createdAt}
      </p>
      <Link to="/admin/product" className="btn btn-secondary">
        Quay lại
      </Link>
    </div>
  );
};

export default ProductDetail;
