import { promises, PathLike } from "fs";
import { resolve } from "path";

export default async function* (dir: string) {
  const files = await promises.readdir(dir, { withFileTypes: true });
  for (let file of files) {
    const res: PathLike = resolve(dir, file.name);
    if (file.isDirectory()) {
      yield* this(res);
    } else {
      yield res;
    }
  }
}
