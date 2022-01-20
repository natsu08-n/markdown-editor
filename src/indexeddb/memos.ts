import Dexie from 'dexie';

//IndexedDB に保存するデータの型を定義
//typescriptのinterfaceは型の宣言だから型に名前をつけることができる
export interface MemoRecord {
	datetime: string
	title: string
	text: string
}
//Dexie のインスタンスを生成。データベース名は markdown-editor
const database = new Dexie('markdown-editor')
//テーブルを定義().version(1) はデータベースのバージョン、.stores() で使用するテーブルとインデックスとなるデータ名を指定.　&から始めることでUnique indexを表す)
database.version(1).stores({memos:'&datetime'})
//データを扱うテーブルクラスを取得(db.table(storeName)で取得)
//: Dexie.Table<MemoRecord, string>ジェネリクスで型を定義(MemoRecord はデータの型、string はキーとなるデータ（今回は datetime）の型)
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

//メモを保存するために、タイトルとテキストを引数として受け取る関数を定義
export const putMemo = async (title: string, text: string): Promise<void> => {
	//toISOString() メソッドは、簡潔な拡張表記の ISO 形式 (ISO 8601) の文字列を返す。これは、常に24文字または27文字の長さ(それぞれ、YYYY-MM-DDTHH:mm:ss.sssZ または ±YYYYYY-MM-DDTHH:mm:ss.sssZ)。
	const datetime = new Date().toISOString()
	//IndexedDB 保存
	await memos.put({datetime, title, text})
}

export const getMemos = (): Promise<MemoRecord[]> => {
	return memos.orderBy('datetime')
	.reverse() //datetime（保存した日時）の昇順（古い順）で取得
	.toArray()
}