const { useState, useEffect } = React;

// --- アイコンコンポーネント ---
const IconBase = ({ d, size = 24, className = "", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {d}
    </svg>
);

const User = (props) => <IconBase {...props} d={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const MessageSquare = (props) => <IconBase {...props} d={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>} />;
const PenTool = (props) => <IconBase {...props} d={<><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></>} />;
const CheckCircle = (props) => <IconBase {...props} d={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>} />;
const Ban = (props) => <IconBase {...props} d={<><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></>} />;
const RefreshCw = (props) => <IconBase {...props} d={<><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></>} />;
const ArrowRight = (props) => <IconBase {...props} d={<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>} />;
const Users = (props) => <IconBase {...props} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />;
const Activity = (props) => <IconBase {...props} d={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>} />;
const Footprints = (props) => <IconBase {...props} d={<><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 11 3.8 11 8c0 1.25-.51 2-1.25 2H6.88c-.63 0-1.13.5-1.13 1.13V16h-1.75Z"/><path d="M14.5 18c.25 0 .75-.63 1.38-1.5s1.38-2.63 1.38-4.5c0-1.5-1-4-3-4C11.5 8 11 11.5 11 13.5c0 .67.17 1.3.5 1.8.3.47.78 1.4 1 2.2a1 1 0 0 1-1 1H9a2 2 0 0 0-2 2v2h8v-3.5c0-.66.5-1 1-1h1.5a.5.5 0 0 0 .5-.5V14h-5Z"/></>} />;
const AlertTriangle = (props) => <IconBase {...props} d={<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />;
const LogOut = (props) => <IconBase {...props} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>} />;
const MicrosoftLogo = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>;


// --- 設定値 & 定数 ---
const STATUS_CONFIG = {
    INACTIVE: {
        id: 'inactive',
        label: '名前を入力してください',
        color: 'bg-gray-100 text-gray-400 border-gray-200',
        icon: Ban,
        buttonColor: 'bg-gray-200',
    },
    AVAILABLE: {
        id: 'available',
        label: '空き',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: CheckCircle,
        buttonColor: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    },
    MEETING: {
        id: 'meeting',
        label: '面談中',
        color: 'bg-rose-100 text-rose-700 border-rose-200',
        icon: MessageSquare,
        buttonColor: 'bg-rose-500 hover:bg-rose-600 text-white',
    },
    WRITING: {
        id: 'writing',
        label: '入力中',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: PenTool,
        buttonColor: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
};

const generateInitialRooms = () => Array.from({ length: 18 }, (_, i) => ({
    id: `room-${i + 1}`,
    roomNumber: `${i + 1}`,
    name: '',
    status: 'inactive',
    isGuiding: false,
    message: '',
    updatedAt: new Date().toISOString(),
}));

const getMiniStatusColor = (room) => {
    if (room.isGuiding) return 'bg-violet-500 animate-pulse ring-2 ring-violet-300';
    switch (room.status) {
        case 'available': return 'bg-emerald-500';
        case 'meeting': return 'bg-rose-500';
        case 'writing': return 'bg-amber-500';
        default: return 'bg-gray-200 text-gray-400';
    }
};

// --- コンポーネント ---

// リセット確認モーダル
const ResetModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-100">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">全リセットの確認</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        すべての部屋の入力内容（名前、ステータス、メモ）を削除します。<br/>
                        この操作は元に戻せません。
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors">キャンセル</button>
                    <button onClick={onConfirm} className="flex-1 px-4 py-3 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-bold shadow-lg shadow-rose-200 transition-transform active:scale-95">リセット実行</button>
                </div>
            </div>
        </div>
    );
};

// ログイン（ランディング）画面
const LandingPage = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
            <div className="absolute top-10 left-10 opacity-10 animate-pulse"><MessageSquare size={120} /></div>
            <div className="absolute bottom-20 right-10 opacity-10 animate-bounce" style={{ animationDuration: '3s' }}><Users size={150} /></div>
            <div className="absolute top-1/2 right-1/4 opacity-5"><Activity size={200} /></div>

            <div className="z-10 max-w-2xl w-full text-center space-y-8 backdrop-blur-sm bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-white/20 p-4 rounded-2xl shadow-inner">
                        <Users size={64} className="text-blue-100" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                    個別相談<br />
                    <span className="text-blue-200">リアルタイムボード</span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed">
                    相談室の空き状況や進捗を<br className="md:hidden"/>一目で共有。<br/>
                    スムーズな運営をサポートします。
                </p>

                <div className="pt-8">
                    <button
                        onClick={onLogin}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 transition-all duration-200 bg-white text-lg rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900 hover:bg-gray-50 hover:scale-105 shadow-xl w-full sm:w-auto"
                    >
                        <MicrosoftLogo className="mr-3" />
                        <span>Microsoftでログイン</span>
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            <div className="absolute bottom-6 text-blue-300/60 text-sm">Realtime Status Board System</div>
        </div>
    );
};

// 部屋カードコンポーネント
const RoomCard = ({ room, onUpdate }) => {
    const currentConfig = STATUS_CONFIG[room.status.toUpperCase()] || STATUS_CONFIG.INACTIVE;
    const Icon = currentConfig.icon;

    const handleNameChange = (e) => {
        const newName = e.target.value;
        let updates = { name: newName };

        if (newName && room.status === 'inactive') {
            updates.status = 'available';
        } else if (!newName) {
            updates.status = 'inactive';
            updates.isGuiding = false;
            updates.message = '';
        }
        onUpdate(room.id, updates);
    };

    const handleStatusClick = (statusKey) => {
        if (!room.name) return;
        const updates = { status: statusKey };
        if (statusKey === 'meeting') updates.isGuiding = false;
        if (statusKey === 'available') updates.message = '';
        onUpdate(room.id, updates);
    };

    const handleGuidingClick = () => {
        if (!room.name) return;
        onUpdate(room.id, { isGuiding: !room.isGuiding });
    };

    const handleMessageChange = (e) => {
        if (!room.name) return;
        onUpdate(room.id, { message: e.target.value });
    };

    const cardClassName = `relative flex flex-col p-4 rounded-xl border-2 transition-all duration-300 ${currentConfig.color} shadow-sm`;
    const operationAreaClassName = `flex flex-col gap-2 mt-auto transition-opacity duration-300 ${room.name ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`;
    const guidingButtonClass = `flex-none w-1/3 flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
        room.isGuiding ? 'bg-violet-500 text-white ring-2 ring-offset-1 ring-violet-500 shadow-md' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
    }`;

    return (
        <div className={cardClassName}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold opacity-80">{room.roomNumber}</h3>
                <div className="flex gap-2">
                    {room.isGuiding && (
                        <div className="p-2 rounded-full bg-violet-500 text-white animate-pulse shadow-md" title="誘導中"><Footprints size={24} /></div>
                    )}
                    <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm"><Icon size={24} /></div>
                </div>
            </div>
            <div className="mb-4 text-center py-1 rounded bg-white/40 font-bold tracking-wider transition-colors duration-300">
                {room.isGuiding ? <span className="text-violet-600 font-extrabold flex items-center justify-center gap-1"><Footprints size={16}/> 誘導中</span> : currentConfig.label}
            </div>
            <div className="mb-4">
                <label className="block text-xs font-semibold opacity-70 mb-1 ml-1">担当者名</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-40"><User size={16} /></div>
                    <input type="text" value={room.name || ''} onChange={handleNameChange} placeholder="名前を入力..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 border-0 focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all outline-none text-gray-800 placeholder-gray-400" />
                </div>
            </div>
            <div className={operationAreaClassName}>
                <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleStatusClick('meeting')} className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-transform active:scale-95 ${room.status === 'meeting' ? 'ring-2 ring-offset-1 ring-rose-500 shadow-md scale-105' : 'opacity-60 hover:opacity-100'} ${STATUS_CONFIG.MEETING.buttonColor}`}><MessageSquare size={16} className="mb-1" />面談</button>
                    <button onClick={() => handleStatusClick('writing')} className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-transform active:scale-95 ${room.status === 'writing' ? 'ring-2 ring-offset-1 ring-amber-500 shadow-md scale-105' : 'opacity-60 hover:opacity-100'} ${STATUS_CONFIG.WRITING.buttonColor}`}><PenTool size={16} className="mb-1" />入力</button>
                    <button onClick={() => handleStatusClick('available')} className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-transform active:scale-95 ${room.status === 'available' ? 'ring-2 ring-offset-1 ring-emerald-500 shadow-md scale-105' : 'opacity-60 hover:opacity-100'} ${STATUS_CONFIG.AVAILABLE.buttonColor}`}><CheckCircle size={16} className="mb-1" />空き</button>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleGuidingClick} className={guidingButtonClass}><Footprints size={16} className="mb-1" />誘導中</button>
                    <input type="text" value={room.message || ''} onChange={handleMessageChange} placeholder="Memo..." className="flex-1 min-w-0 px-3 py-1 rounded-lg text-sm bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 text-gray-700" />
                </div>
            </div>
            {!room.name && <div className="absolute bottom-4 left-0 w-full text-center text-xs opacity-50 pointer-events-none">名前を入力して開始</div>}
        </div>
    );
};

// ボード画面
const BoardScreen = ({ user, rooms, onUpdateRoom, onResetRequest, onLogout }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                            {user.displayName ? user.displayName.slice(0, 1) : <User size={20}/>}
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">リアルタイムボード</h1>
                            <p className="text-xs text-slate-500 hidden sm:block">Login: {user.displayName || user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={onResetRequest} className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 px-3 py-2 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200">
                            <RefreshCw size={14} /> 全リセット
                        </button>
                        <button onClick={onLogout} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                            <LogOut size={14} /> ログアウト
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 pb-3">
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                        {rooms.map(room => {
                            const statusLabel = STATUS_CONFIG[room.status.toUpperCase()]?.label;
                            const tooltip = `Room ${room.roomNumber}: ${room.name ? (room.isGuiding ? '誘導中' : statusLabel) : '未設定'}`;
                            const miniBoxClass = `w-7 h-7 sm:w-9 sm:h-9 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-bold text-white transition-all duration-300 shadow-sm border border-black/5 overflow-hidden ${getMiniStatusColor(room)}`;
                            return <div key={room.id} title={tooltip} className={miniBoxClass}>{room.name ? room.name.slice(0, 2) : room.roomNumber}</div>;
                        })}
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-end text-sm text-slate-600 bg-white p-3 rounded-lg shadow-sm border border-slate-100 inline-block w-full">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> 空き</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> 面談中</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> 入力中</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-500 animate-pulse"></span> 誘導中</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300"></span> 名前を入力してください</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => <RoomCard key={room.id} room={room} onUpdate={onUpdateRoom} />)}
                </div>
            </main>
        </div>
    );
};

// メインアプリケーション
const App = () => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [firebaseReady, setFirebaseReady] = useState(!!window.FirebaseServices);

    // Firebase初期化完了を待つ
    useEffect(() => {
        if (firebaseReady) return;
        const handleReady = () => setFirebaseReady(true);
        window.addEventListener('firebase-ready', handleReady);
        if (window.FirebaseServices) setFirebaseReady(true);
        return () => window.removeEventListener('firebase-ready', handleReady);
    }, [firebaseReady]);

    // Firebaseの機能を安全に取り出す
    const { signInWithMicrosoft, logout, onAuthStateChanged, ref, onValue, set, update, db } = window.FirebaseServices || {};

    // 認証状態の監視
    useEffect(() => {
        if (!firebaseReady || !onAuthStateChanged) return;
        const unsubscribe = onAuthStateChanged(window.FirebaseServices.auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) setIsLoading(false);
        });
        return () => unsubscribe();
    }, [firebaseReady]);

    // データベースの同期 (ログイン時のみ)
    useEffect(() => {
        if (!firebaseReady || !user || !db) return;

        const roomsRef = ref(db, 'rooms');
        const unsubscribe = onValue(roomsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRooms(data);
            } else {
                const initial = generateInitialRooms();
                set(roomsRef, initial);
                setRooms(initial);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [firebaseReady, user, db]);

    const handleLogin = async () => {
        try {
            await signInWithMicrosoft();
        } catch (error) {
            console.error("Login failed:", error);
            alert("ログインに失敗しました: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleUpdateRoom = (id, updates) => {
        if (!user) return;
        const roomIndex = parseInt(id.split('-')[1]) - 1;
        const roomRef = ref(db, `rooms/${roomIndex}`);
        update(roomRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
    };

    const executeReset = () => {
        if (!user) return;
        const roomsRef = ref(db, 'rooms');
        set(roomsRef, generateInitialRooms());
        setShowResetConfirm(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="animate-spin mr-2"><RefreshCw size={24}/></div> Loading...
            </div>
        );
    }

    if (!user) {
        return <LandingPage onLogin={handleLogin} />;
    }

    return (
        <React.Fragment>
            <BoardScreen
                user={user}
                rooms={rooms}
                onUpdateRoom={handleUpdateRoom}
                onResetRequest={() => setShowResetConfirm(true)}
                onLogout={handleLogout}
            />
            <ResetModal
                isOpen={showResetConfirm}
                onClose={() => setShowResetConfirm(false)}
                onConfirm={executeReset}
            />
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
