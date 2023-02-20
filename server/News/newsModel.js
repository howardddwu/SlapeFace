import mongoose from "mongoose"

// Prophecy Schema
const NewsSchema = mongoose.Schema({
    numberOfArticle: { type: Number, default: 0 },
    status: { type: Boolean, required: false },
    updatedAt: { type: Date, default: Date.now },
    articles: { type: Array, default: [] },
})

const NewsModel = mongoose.model('News', NewsSchema)
export default NewsModel