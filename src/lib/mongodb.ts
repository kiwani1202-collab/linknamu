import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
}

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 로드되므로,
// 연결을 globalThis에 보관해 재사용합니다. (연결이 계속 늘어나는 것 방지)
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo.mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise = clientPromise;
}

// DB 이름은 연결 문자열의 경로(/linknamu)를 따릅니다.
export async function getDb() {
  const client = await clientPromise;
  return client.db();
}
