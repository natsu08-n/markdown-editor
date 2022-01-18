import * as React from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import * as ReactMarkdown from "react-markdown";
import { putMemo } from '../indexeddb/memos';
import { Button } from "../components/button";
import { SaveModal } from '../components/save_modal';
import { Link } from 'react-router-dom';
import { Header } from '../components/header'

const { useState } = React;



//localStorageでデータの参照・保存に使うキー名を決定。今回は「ファイルパス：値の名前」の命名規則とした。
const StorageKey = 'pages/editor:text'

//rem単位
//ルート要素（通常はhtml要素）のfont-size値を基準として相対的な値となります。
//html要素のfont-size値はデフォルトでは16px
const Wrapper = styled.div`
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	top: 3rem;
`

const HeaderArea = styled.div`
	position: fixed;
	right: 0;
	top: 0;
	left: 0;
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
	const [text, setText] = useStateWithStorage('', StorageKey)

	//モーダルのフラグ管理（初期状態ではモーダルを出さないのでデフォルト値false）
	const [showModal, setShowModal] = useState(false)

	return (
		<>
		<HeaderArea>
			<Header title="Markdown Editor">
				<Button onClick={() => setShowModal(true)}>
					保存する
				</Button>
				<Link to="/history">
				履歴を見る
				</Link>
			</Header>
		</HeaderArea>
		<Wrapper>
			<TextArea 
				onChange={(event) => {
					setText(event.target.value)
				}}
				value={text}/>
			<Preview>
				<ReactMarkdown>{text}</ReactMarkdown>
			</Preview>
		</Wrapper>
		{showModal&&(
			<SaveModal 
			onSave={(title: string): void => {
				putMemo(title, text)
				setShowModal(false)
			}}
			onCancel={() => setShowModal(false)}
			/>
		)}
		</>
	)
}