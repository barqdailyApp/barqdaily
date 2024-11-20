"use server";

import { endpoints } from "@/utils/endpoints";
import { getData, postData } from "@/utils/crud-fetch-api";

import { CancelReason } from "@/types/order";

export const fetchCancelReasons = async (): Promise<
  { data: CancelReason[] } | { error: string }
> => {
  const reasons = await getData<CancelReason[]>(
    endpoints.orders.reasons("CANCEL_ORDER")
  );

  return reasons;
};
export const fetchReturnReasons = async (): Promise<
  { data: CancelReason[] } | { error: string }
> => {
  const reasons = await getData<CancelReason[]>(
    endpoints.orders.reasons("RETURN_ORDER")
  );

  return reasons;
};

export const cancelShipment = async ({
  shipmentId,
  reasonId,
}: {
  shipmentId: string;
  reasonId: string;
}): Promise<{ data: string } | { error: string }> => {
  const res = await postData<string, { reason_id: string }>(
    endpoints.orders.cancel(shipmentId),
    { reason_id: reasonId }
  );

  return res;
};

interface Feedback {
  shipment_id: string;
  driver_id: string;
  delivery_time: number;
  packaging: number;
  communication: number;
}
export const addShipmentFeedback = async (
  body: Feedback
): Promise<{ data: string } | { error: string }> => {
  const res = await postData<string, Feedback>(
    endpoints.orders.addFeedback,
    body
  );

  return res;
};

interface ReturnOrderBody {
  returned_shipment_products: {
    shipment_product_id: string;
    return_product_reason_id: string;
    quantity: number;
  }[];
  customer_note: string;
}

export const returnOrder = async ({
  orderId,
  body,
}: {
  orderId: string;
  body: ReturnOrderBody;
}): Promise<{ data: string } | { error: string }> => {
  const res = await postData<string, ReturnOrderBody>(
    endpoints.orders.return(orderId),
    body
  );

  return res;
};
