import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductDetail, updateProduct } from "../../api/productApi";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await getProductDetail(id);
        reset(todo); // ✅ Reset với data đã fetch
        setLoading(false);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu!");
        console.error(error);
      }
    };
    fetchTodo();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(id, data); // ✅ Truyền đúng thứ tự id, data
      toast.success("Cập nhật thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center">Đang tải...</div>;

  return (
    <div className="container mt-5">
      <h2>Sửa Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Tiêu đề</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label>Mô tả</label>
          <textarea className="form-control" {...register("description")} />
        </div>
        <div className="mb-3">
          <label>Ưu tiên</label>
          <select className="form-select" {...register("priority")}>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("completed")}
          />
          <label className="form-check-label">Đã hoàn thành</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
