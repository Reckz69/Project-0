import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema({
    videoFile:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },

    isPublished:{
        type: Boolean,
        default: true,
    },
    views: {
        type: Number,
        default: 0,
      },
    viewedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
},
{
    timestamps: true,
})
// Add this before: const Video = mongoose.model("Video", VideoSchema);
VideoSchema.index({ 
    title: "text", 
    description: "text" 
});

VideoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", VideoSchema);


export { Video };