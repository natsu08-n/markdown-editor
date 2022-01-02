import * as React from "react";
import styled from "styled-components";

//上でreactからimportしてきた名前をReactに変えているのでこの書き方
const { useState } = React

//localStorageでデータの参照・保存に使うキー名を決定。今回は「ファイルパス：値の名前」の命名規則とした。
const StorageKey = 'pages/editor:text'

//rem単位
//ルート要素（通常はhtml要素）のfont-size値を基準として相対的な値となります。
//html要素のfont-size値はデフォルトでは16px
const Header = styled.header`
	font-size: 1.5rem;
	height: 2rem;
	left: 0;
	line-height: 2rem;
	padding: 0.5rem 1rem;
	position: fixed;
	right: 0;
	top: 0;
`

const Wrapper = styled.div`
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	top: 3rem;
`

const TextArea = styled.textarea`
	border-right: 1px solid silver;
	border-top: 1px solid silver;
	bottom: 0;
	font-size: 1rem;
	left: 0;
	padding: 0.5rem;
	position: absolute;
	top: 0;
	width: 50vw;
`

const Preview = styled.div`
	border-top: 1px solid silver;
	bottom: 0;
	over-flow: scroll;
	padding: 1rem;
	position: absolute;
	right: 0;
	top: 0;
	width: 50vw;
`

export const Editor: React.FC = () => {
	// localStorageから値を取得　localStorage.getItem(key)、こちらはnullを返す場合がある（初回アクセス時など）ので、 || '' をつけて必ず文字列が入るようにする。
	const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')
	return (
		<>
		<Header>
			Markdown Editor
		</Header>
		<Wrapper>
			<TextArea 
				onChange={(event) => {
					const changedText = event.target.value
					// localStorageに値を保存 localStorage.setItem(key, val)
					localStorage.setItem(StorageKey, changedText)
					setText(changedText)
				}}
				value={text}/>
			<Preview>プレビューエリア</Preview>
		</Wrapper>
		</>
	)
}