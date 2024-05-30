# Event Web Application Project

React + TypeScript로 구현하였으며, 디테일 데이터 조, 추가, 삭제, 수정이 가능합니다.
날짜 별, 최신 순, 오래된 순 sorting이 가능 하며, 이벤트 title로 검색이 가능합니다.

## 🖥️ 프로젝트 설정 및 실행 방법

### 요구 사항
- Node.js (버전 14 이상 권장)
- npm

### 프로젝트 클론
```git clone https://github.com/magok-developer/tooltip-practice.git```

### 의존성 설치
- npm install

### Json server 실행
- json-server ./data.json --port 3001

### 개발 서버 실행
- npm start

## 🔧 사용 기술
- React
- TypeScript
- Axios
- styled-components, CSS

## 🏠 프로젝트 구조
```
eventApp-project/
│
├── node_modules/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── Components/
│   │   ├── Button/
│   │   │   └── Button.tsx
│   │   ├── Calendar/
│   │   │   └── Calendar.tsx
│   │   ├── DataItem/
│   │   │   └── DataItem.tsx
│   │   ├── DataList/
│   │   │   └── DataList.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── Input/
│   │   │   └── Input.tsx
│   │   ├── Pagination/
│   │   │   └── Pagination.tsx
│   │   ├── Textarea/
│   │       └── Textarea.tsx
│   │
│   ├── model/
│   │   └── types.ts
│   │
│   ├── Pages/
│   │   ├── Create.tsx
│   │   ├── Detail.tsx
│   │   ├── Edit.tsx
│   │   └── Home.tsx
│   │
│   ├── styles/
│   │   ├── App.css
│   │   └── App.test.tsx
│   │
│   ├── api.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   └── util.ts
│
├── .gitignore
├── data.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```


## 🖼️ 화면 구조
### Header
- 날짜별 필터링
- 최신 순/오래된 순 정렬
- 키워드로 타이틀 검색
- 이벤트 추가 기능
### Body
- 이벤트 목록을 테이블 형식으로 표시
  - 날짜와 시간, 타이틀, 삭제 아이콘 포함
  - 테이블 행 hover 시 색상 변화로 선택된 행 강조
- 테이블 행 클릭 시 해당 이벤트의 상세 페이지로 이동
  - 상세 페이지에서 타이틀, 날짜, 시간, 위치, 설명 확인 가능
  - 수정 버튼 클릭 시 이벤트 수정 페이지로 이동
### Footer
- 페이지네이션 컴포넌트
  - 한 페이지당 최대 5개의 이벤트 표시

## 📊 API
### 이벤트 목록 조회
`GET/data`
- 모든 이벤트 목록을 조회합니다.

### 이벤트 추가
`POST/data`
- 새로운 이벤트를 추가합니다.

### 이벤트 상세 조회
`GET/data/:id`
- 특정 이벤트를 조회합니다.

### 이벤트 수정
`PUT/data/:id`
- 특정 이벤트를 수정합니다.

### 이벤트 삭제
`DELETE/data/:id`
- 특정 이벤트를 삭제합니다.
