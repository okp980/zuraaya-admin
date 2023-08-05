"use client"
import Card from "@/components/common/card"
import Search from "@/components/common/search"
import ProductList from "@/components/products/product-list"
import React, { useState } from "react"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"
import cn from "classnames"
import CategoryTypeFilter from "@/components/products/category-type-filter"
import { useGetProductsQuery } from "@/redux/services/products"

type Props = {}

const ProductsPage = (props: Props) => {
  const [visible, setVisible] = useState(false)
  const { data: products, isLoading, isError } = useGetProductsQuery()

  const toggleVisible = () => {
    setVisible((v) => !v)
  }
  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-lg font-semibold text-heading">Products</h1>
          </div>
          <div className="flex w-full flex-col items-center ms-auto md:w-3/4">
            <Search onSearch={() => {}} />
          </div>
          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
            onClick={toggleVisible}
          >
            Filter
            {visible ? (
              <BsArrowUp className="ms-2" />
            ) : (
              <BsArrowDown className="ms-2" />
            )}
          </button>
        </div>
        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CategoryTypeFilter
              className="w-full"
              onCategoryFilter={() => {}}
              onSubCategoryFilter={() => {}}
            />
          </div>
        </div>
      </Card>
      <ProductList
        products={products?.data}
        paginatorInfo={products?.pagination!}
        onPagination={() => {}}
      />
    </>
  )
}

export default ProductsPage