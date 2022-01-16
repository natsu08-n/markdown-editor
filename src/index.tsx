import * as React from "react"
import { render } from "react-dom"
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components' //ページ全体に適用できるスタイルを定義
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
}	from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from "./pages/history"


const GlobalStyle = createGlobalStyle`
body * {
	box-sizing: border-box;
}
`
const Main = (
	<>
	<GlobalStyle/>
	<Router>
	{/*exact 属性は、パスの判定方法を切り替えるパラメーター、exact={true} の場合は完全一致、exact={false} は部分一致*/}
		<Route exact path="/editor">
			<Editor/>
		</Route>
		<Route exact path="/history">
			<History />
		</Route>
		{/*定義されていないパスの場合は /editor にリダイレクト*/}
		<Redirect to="/editor" path="*"/>
	</Router>
	</>
)

render(Main, document.getElementById("app"))