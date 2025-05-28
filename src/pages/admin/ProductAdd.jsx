import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "./../../api/productApi";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.completed = data.completed === "true";
      await createProduct(data);
      toast.success("Tạo mới todo thành công!");

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi tạo todo.");
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/admin/product" className="btn btn-primary">
        Trở lại
      </Link>
      <h2 className="text-center mb-4">Thêm mới Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tiêu đề</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
            placeholder="Nhập tiêu đề todo..."
          />
          {errors.title && (
            <span className="text-danger">Tiêu đề không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows="3"
            {...register("description", { required: true })}
            placeholder="Nhập mô tả chi tiết..."
          ></textarea>
          {errors.description && (
            <span className="text-danger">Mô tả không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mức độ ưu tiên</label>
          <select
            className="form-select"
            {...register("priority", { required: true })}
          >
            <option value="">-- Chọn mức độ --</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
          {errors.priority && (
            <span className="text-danger">Vui lòng chọn mức độ ưu tiên.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Hoàn thành</label>
          <select
            className="form-select"
            {...register("completed", { required: true })}
          >
            <option value="false">Chưa hoàn thành</option>
            <option value="true">Đã hoàn thành</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success px-4 me-2 rounded-pill"
          >
            Tạo Todo
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4 rounded-pill"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
