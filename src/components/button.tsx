import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	background-color: dodgerblue;
	border: none;
	box-shadow: none;
	color: white;
	font-size: 1rem;
	height: 2rem;
	min-width: 5rem;
	padding: 0 1rem;

	&.cancel {
		background: white;
		border: 1px solid gray;
		color: gray;
	}
`

interface Props {
	cancel?: boolean //cancel?: boolean というのは cancel というパラメーターを指定しなくても良い、という意味
	children: String //ボタン内に表示するテキスト
	onClick: () => void //ボタンをクリックしたときの処理関数
}
//React.FCは、constによる型定義でコンポーネントを定義できる型。
//React.FC<Props> のように定義すると、引数の props は Props(typescriptでinterfaceとして定義したProps) であると型を明示できる。
export const Button: React.FC<Props> = (props) => (
	<StyledButton onClick={props.onClick} className={props.cancel ? 'cancel':''}>
		{props.children}
	</StyledButton>
)