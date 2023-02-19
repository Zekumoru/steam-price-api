import mongoose from 'mongoose';

const CurrencySchema = new mongoose.Schema({
  symbol: String,
  placement: String,
});

const PriceSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  currency: CurrencySchema,
  text: {
    type: String,
    required: true,
  },
  original_string: String,
});

const GamePriceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: PriceSchema,
});

const GamePriceModel = mongoose.model('GamePrice', GamePriceSchema);

export default GamePriceModel;
