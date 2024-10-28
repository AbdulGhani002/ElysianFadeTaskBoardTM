import { Bson } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

interface ITag {
  name: string;
  color: string;
  description?: string;
}

const tagSchema = new Bson.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String },
});

const Tag = Bson.model<ITag>('Tag', tagSchema);

export default Tag;