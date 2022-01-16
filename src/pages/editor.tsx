import * as React from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import * as ReactMarkdown from "react-markdown";
import { putMemo } from '../indexeddb/memos';
import { Button } from "../components/button";
import { SaveModal } from '../components/save_modal';
import { Link } from 'react-router-dom';

const { useState } = React;



//localStorageでデータの参照・保存に使うキー名を決定。今回は「ファイルパス：値の名前」の命名規則とした。
const StorageKey = 'pages/editor:text'

//rem単位
//ルート要素（通常はhtml要素）のfont-size値を基準として相対的な値となります。
//html要素のfont-size値はデフォルトでは16px
const Header = styled.header`
	align-content: center;
	display: flex;
	font-size: 1.5rem;
	height: 2rem;
	justify-content: space-between;
	left: 0;
	line-height: 2rem;
	padding: 0.5rem 1rem;
	position: fixed;
	right: 0;
	top: 0;
`
const HeaderControl = styled.div`
	height: 2rem;
	display: flex;
	align-content: center;
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
	const [text, setText] = useStateWithStorage('', StorageKey)

	//モーダルのフラグ管理（初期状態ではモーダルを出さないのでデフォルト値false）
	const [showModal, setShowModal] = useState(false)

	return (
		<>
		<Header>
			Markdown Editor
			<HeaderControl>
				<Button onClick={() => setShowModal(true)}>
					保存する
				</Button>
				<Link to="/history">
				履歴を見る
				</Link>
			</HeaderControl>
		</Header>
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