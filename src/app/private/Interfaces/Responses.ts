export interface ItemResponse {
    id: number;
    sku: string;
    title: string;
    description: string;
    status: string;
    total_stock: number;
    item_cost: {
      comision_fee: number;
      comision_discount: number;
      shipping: number;
      replacement_cost: number;
      profit: number,
      total_cost: number;
      margin: number;
      iibb: number;
    };
    price: number;
  }

  export interface CostResponse {
    id: number;
    sku: string;
    title: string;
    description: string;
    status: string;
    total_stock: number;
    item_cost: {
      comision_fee: number;
      comision_discount: number;
      shipping: number;
      replacement_cost: number;
      profit: number,
      total_cost: number;
      margin: number;
      iibb: number;
    };
    price: number;
  }

  export interface StockItem {
    id: number;
    sku: string;
    available_quantity: number;
    price: number;
    register_date: string;
    supplierContent: {
      id: number;
      sku: string;
      availableQuantity: any;
      price: any;
      updateDate: any;
      nickname: any;
    } | null;
    totalElements?: number;
  }

  export interface CostResponse {
    id: number;
    sku: string;
    title: string;
    description: string;
    status: string;
    total_stock: number;
    item_cost: {
      comision_fee: number;
      comision_discount: number;
      shipping: number;
      replacement_cost: number;
      profit: number,
      total_cost: number;
      margin: number;
      iibb: number;
    };
    price: number;
  }
