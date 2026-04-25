document.addEventListener('DOMContentLoaded', function() {
    const player = document.querySelector('.audio-player');
    const cover = player.querySelector('.cover');
    const trackTitle = player.querySelector('.track-title');
    const currentTime = player.querySelector('.current-time');
    const duration = player.querySelector('.duration');
    const progressBar = player.querySelector('.progress-container');
    const progress = player.querySelector('.progress');
    const playPauseBtn = player.querySelector('.play-pause');
    const prevBtn = player.querySelector('.prev');
    const nextBtn = player.querySelector('.next');
    const playlistToggle = player.querySelector('.playlist-toggle');
    const playlist = player.querySelector('.playlist');
    const playlistItems = player.querySelector('.playlist-items');
    const addTrack = player.querySelector('.add-track');
    const addBtn = player.querySelector('.add-btn');
    const modeToggle = player.querySelector('.mode-toggle');
    const audio = player.querySelector('.audio-source');

    const tracksLibrary = [
        {
					title: 'Antew - Призрачный город',
					src: 'пр.mp3',
					cover: 'https://avatars.mds.yandex.net/get-entity_search/5393828/1257711161/SUx104_2x'
        },
        {
                    title: 'Тима Белорусских - Под звездопадом',
                    src: 'зв.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1727263/493612500/SUx104_2x'
        },
		{
					title: 'Король и Шут - Танец злобного гения',
                    src: 'тн.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/5104408/1231023052/SUx104_2x'
        },
		{					 
                    title: 'Тима Белорусских - Искры',
                    src: 'ис.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/49811/782186423/SUx104_2x'
		},
		{					
					title: 'Тима Белорусских - Витаминка',
                    src: ' вт.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/761788/783808318/SUx104_2x'
		},
		{					
                    title: 'Тима Белорусских - Мокрые кросы',
                    src: 'мк.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/7867374/783860470/SUx104_2x'
		},
		{					
                    title: 'Король и Шут - Кукла колдуна',
                    src: 'кк.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/8129943/651580798/SUx104_2x'
		},
		{
                    title: 'Король и Шут - Дурак и молния',
                    src: 'дм.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1989973/491731016/SUx104_2x'
		},
		{
                    title: 'Король и Шут - Лесник',
                    src: 'ле.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/7980340/599857194/S122x122Smart_2x'
		},
		{				
                    title: 'Виктор Цой - Группа крови',
                    src: 'гп.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1730543/340515713/SUx104_2x'
		},
		{				
                    title: 'Виктор Цой - Закрой за мной дверь, я ухожу',
                    src: 'вп.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1730543/340515713/SUx104_2x'
		},
		{					
                    title: 'Виктор Цой - Кончится лето',
                    src: 'кн.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1730543/340515713/SUx104_2x'
		},
		{			
                    title: 'SLAVA SKRIPKA - Бобр',
                    src: 'бб.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/2032283/954867582/SUx104_2x'
		},
		{
                    title: 'Antew - Утро',
                    src: 'ут.mp3',
                    cover: 'https://avatars.mds.yandex.net/i?id=0d1bdc4b6b619e369ec29b119a2aad81173845bf-4575485-images-thumbs&n=13'
		},
		{			
                    title: 'Извините за опоздание - Мы договорились с тобою влюбиться',
                    src: 'мы.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1963038/531967414/SUx104_2x'
		},
		{	
                    title: 'Моя любовь давно не плачет обо мне - Женя Гик',
                    src: 'мл.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1595090/1232211178/SUx104_2x'
		},
		{				
                    title: 'ST feat Norma Tale - Стороны моря',
                    src: 'ст.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/5394633/1231015971/SUx104_2x'
		},
		{				
                    title: 'Женя Гик - Серый человек',
                    src: 'сч.mp3',
                    cover: 'https://avatars.mds.yandex.net/get-entity_search/1595090/1232211178/SUx104_2x'
		}
    ];

    // Загружаем сохранённый плейлист из localStorage
    let playlistTracks = JSON.parse(localStorage.getItem('savedPlaylist')) || [];
    let currentTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
    let isPlaying = false;
    let isPlaylistMode = localStorage.getItem('isPlaylistMode') === 'true';

    function init() {
        // Заполняем выпадающий список
        tracksLibrary.forEach(track => {
            const option = document.createElement('option');
            option.value = JSON.stringify(track);
            option.textContent = track.title;
            addTrack.appendChild(option);
        });

        // Загружаем первый трек
        loadTrack(currentTrackIndex);

        // Обновляем отображение плейлиста
        updatePlaylistDisplay();

        // Устанавливаем режим воспроизведения
        modeToggle.textContent = isPlaylistMode
            ? 'Режим: плейлист'
            : 'Режим: библиотека';

        // Обработчики событий
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextTrack);
        audio.addEventListener('error', handleAudioError);

        playPauseBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevTrack);
        nextBtn.addEventListener('click', nextTrack);
        progressBar.addEventListener('click', seek);
        playlistToggle.addEventListener('click', togglePlaylist);
        addBtn.addEventListener('click', addToPlaylist);
        modeToggle.addEventListener('click', toggleMode);
    }

    function loadTrack(index) {
        const trackList = isPlaylistMode && playlistTracks.length > 0
            ? playlistTracks
            : tracksLibrary;

        if (trackList.length === 0) {
            alert('Нет треков для воспроизведения!');
            return;
        }

        const track = trackList[index];
        if (!track) {
            console.error('Трек не найден по индексу:', index);
            return;
        }

        audio.src = track.src;
        trackTitle.textContent = track.title;
        cover.src = track.cover;
        cover.alt = `Обложка: ${track.title}`;

        cover.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMvb3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI0NDQ0NDQyIvPjx0ZXh0IHg9IjcwIiB5PSI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMDAwIj5ObyBDb3ZlciA8L3RleHQ+PC9zdmc+';
            this.alt = 'Обложка недоступна';
        };

        currentTrackIndex = index;
        saveCurrentTrackIndex();
        updatePlaylistHighlight();
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play().catch(e => {
                console.error('Ошибка воспроизведения:', e);
                alert('Не удалось воспроизвести аудио. Проверьте файл и подключение.');
            });
            playPauseBtn.textContent = '⏸';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
        }
        isPlaying = !audio.paused;
    }

    function prevTrack() {
        const totalTracks = isPlaylistMode ? playlistTracks.length : tracksLibrary.length;
        if (totalTracks === 0) return;

        currentTrackIndex = (currentTrackIndex - 1 + totalTracks) % totalTracks;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }

    function nextTrack() {
        const totalTracks = isPlaylistMode ? playlistTracks.length : tracksLibrary.length;
        if (totalTracks === 0) return;

        currentTrackIndex = (currentTrackIndex + 1) % totalTracks;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }

    function updateDuration() {
        if (!isNaN(audio.duration)) {
            duration.textContent = formatTime(audio.duration);
        }
    }

    function updateProgress() {
        if (audio.duration && !isNaN(audio.currentTime)) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${percent}%`;
            currentTime.textContent = formatTime(audio.currentTime);
        }
    }

    function seek(e) {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    }

    function togglePlaylist() {
        playlist.classList.toggle('hidden');
        playlistToggle.textContent = playlist.classList.contains('hidden') ? 'ℹ️' : '🗑️';
    }

    function addToPlaylist() {
        const selectedValue = addTrack.value;
        if (!selectedValue) {
            alert('Выберите трек из списка!');
            return;
        }

        const trackToAdd = JSON.parse(selectedValue);

        if (playlistTracks.some(track => track.title === trackToAdd.title)) {
            alert('Этот трек уже в плейлисте!');
            return;
        }

        playlistTracks.push(trackToAdd);
        savePlaylist();
        updatePlaylistDisplay();
        addTrack.selectedIndex = 0; // Сброс выбора
    }

    function removeFromPlaylist(index) {
        playlistTracks.splice(index, 1);
        savePlaylist();
        updatePlaylistDisplay();

        // Если удалённый трек был текущим
        if (currentTrackIndex >= playlistTracks.length && playlistTracks.length > 0) {
            currentTrackIndex = playlistTracks.length - 1;
            loadTrack(currentTrackIndex);
            if (isPlaying) audio.play();
        } else if (playlistTracks.length === 0 && isPlaylistMode) {
            isPlaylistMode = false;
            modeToggle.textContent = 'Режим: библиотека';
            loadTrack(0);
        }
    }

    function updatePlaylistDisplay() {
        playlistItems.innerHTML = '';
        playlistTracks.forEach((track, index) => {
            const li = document.createElement('li');
            if (index === currentTrackIndex && isPlaylistMode) {
                li.classList.add('current-track');
            }

            li.innerHTML = `
                <span class="track-title">${track.title}</span>
                <button class="remove-track" data-index="${index}">×</button>
            `;

            playlistItems.appendChild(li);
        });

        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-track').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromPlaylist(index);
            });
        });
    }

    function updatePlaylistHighlight() {
        document.querySelectorAll('.playlist-items li').forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('current-track');
            } else {
                item.classList.remove('current-track');
            }
        });
    }

    // Сохранение плейлиста в localStorage
    function savePlaylist() {
        localStorage.setItem('savedPlaylist', JSON.stringify(playlistTracks));
    }

    // Сохранение текущего индекса трека
    function saveCurrentTrackIndex() {
        localStorage.setItem('currentTrackIndex', currentTrackIndex);
    }

    // Сохранение режима воспроизведения
    function saveMode() {
        localStorage.setItem('isPlaylistMode', isPlaylistMode);
    }

    function toggleMode() {
        isPlaylistMode = !isPlaylistMode;
        modeToggle.textContent = isPlaylistMode
            ? 'Режим: плейлист'
            : 'Режим: библиотека';

        // Перезагружаем трек с учётом нового режима
        loadTrack(currentTrackIndex);
        saveMode();
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function handleAudioError() {
        alert('Ошибка загрузки аудиофайла. Проверьте путь к файлу.');
    }

    // Запуск инициализации
    init();
});
