//カスタムフックのためのファイル
//useStateと同じ使い方でlocalStorageへの保存も可能にするためにコード記述
import { useState} from 'react'

//カスタムフックはuseから始める慣習がある
//init: stringは初期値でuseState の引数と同じ、key: stringはlocalStorageに保存する際のキー、[string, (s: string) => void] はカスタムフックの戻り値で、useState の戻り値と同じ型
export const useStateWithStorage = (init: string, key: string):[string, (s: string) => void] => {
	const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

	//localStorageへの保存を組み合わせた値の更新関数を作成
	const setValueWithStorage = (nextValue: string): void => {
		//上のuseStateで定義した関数をここで使う
		setValue(nextValue)
		// localStorageに値を保存 localStorage.setItem(key, val)
		localStorage.setItem(key, nextValue)
	}

	//useStateから取得した値であるvalueと、localStorageへの保存更新関数を返却
	return [value, setValueWithStorage]
}