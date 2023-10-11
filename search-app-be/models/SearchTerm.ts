
import mongoose, { Schema } from 'mongoose';

const searchTermSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
});

const SearchTerm = mongoose.model('SearchTerm', searchTermSchema);

export default SearchTerm;
