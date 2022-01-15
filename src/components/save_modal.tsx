import * as React from 'react';
import styled from 'styled-components';
import { Button } from './button';

const { useState } = React;

const Wrapper = styled.div`
	align-items: center;
	background-color: #0002;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
`

const Modal = styled.div`
	background: #fff;
	padding: 1rem;
	width: 32rem;
`

const TitleInput = styled.input`
	width: 29rem;
	padding: 0.5rem;
`

const Control = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding: 1rem;
`

interface Props {
	onSave: (title: string) => void //モーダル保存時の処理関数。引数にタイトル指定。
	onCancel: () => void //モーダル保存をキャンセル時の処理関数。
}

export const SaveModal: React.FC<Props> = props => {
	const { onCancel, onSave} = props
	const [title, setTitle] = useState(new Date().toISOString())

	return (
		<Wrapper>
			<Modal>
				<p>テキストの内容を保存します。</p>
				<p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
				<p>
				<TitleInput
				type={title}
				onChange={(event) => setTitle(event.target.value)} />
				</p>
				<Control>
					{/*末尾のcancelは cancel={true}と同じ意味。*/}
					<Button onClick={onCancel} cancel>
						キャンセル
					</Button>
					<Button onClick={() => onSave(title)}>
						保存
					</Button>
				</Control>
			</Modal>
		</Wrapper>
	)
}
