import { Schema, Types, model } from "mongoose";

import { IProduct } from '@/data/types';

import { Models } from '@/data/types';

const LocalizedStringSchema = new Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true }
}, { _id: false });

const OptionSchema = new Schema({
  name: { type: LocalizedStringSchema, required: true },
  values: {
    en: { type: [String], required: true },
    ar: { type: [String], required: true }
  }
}, { _id: false });

const VariantSchema = new Schema({
  id: { type: String, required: true },
  title: { type: LocalizedStringSchema, required: true },
  price: { type: Number, required: true },
  inventory_quantity: { type: Number, required: true, min: 0 },
  options: {
    type: Map,
    of: LocalizedStringSchema,
    required: true
  },
  images: [{ type: String, required: true }],
  color_hex: { type: String, required: true }
}, { _id: false });

const ProductSchema = new Schema<IProduct>({
  title: { type: LocalizedStringSchema, required: true },
  description: { type: LocalizedStringSchema, required: true },
  price: { type: Number, required: true },
  variants: { type: [VariantSchema], required: true },
  options: { type: [OptionSchema], required: true }
});

export const Product = model<IProduct>(Models.Product, ProductSchema , Models.Product);
