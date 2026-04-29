local strobe = workspace:WaitForChild("Strobes")

--------------------------------------------------
-- SETTINGS
--------------------------------------------------

local COLOR_ON = Color3.fromRGB(0,170,255)
local COLOR_OFF = Color3.fromRGB(255,255,255)

--------------------------------------------------
-- HELPERS
--------------------------------------------------

local buttons = {
	script.Parent.P1,
	script.Parent.P2,
	script.Parent.P3,
	script.Parent.P4,
	script.Parent.P5,
	script.Parent.P6,
	script.Parent.P7,
}

local currentActive = nil

local function ForAll(callback)
	for _, xs in pairs(strobe:GetChildren()) do
		if xs:FindFirstChild("Motors") and xs.Motors:FindFirstChild("Tilt") then
			callback(xs)
		end
	end
end

local function ResetButtonColors()
	for _, btn in pairs(buttons) do
		btn.BackgroundColor3 = COLOR_OFF
	end
end

local function ActivateButton(button)
	if currentActive == button then
		-- Unequip if clicking same button again
		button.BackgroundColor3 = COLOR_OFF
		currentActive = nil

		ForAll(function(xs)
			xs.Motors.Tilt.DesiredAngle = 0
		end)

		return false
	else
		ResetButtonColors()
		button.BackgroundColor3 = COLOR_ON
		currentActive = button
		return true
	end
end

--------------------------------------------------
-- P1  ★ LIGHT SHOW ★
--------------------------------------------------

script.Parent.P1.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P1) then return end

	task.spawn(function()
		local btn = script.Parent.P1

		-- Ordered strobe names so we can address them individually
		local names = {"S1","S2","S3","S4","S5","S6","S7","S8"}

		-- Helper: get a specific strobe by name
		local function getStrobe(name)
			local s = strobe:FindFirstChild(name)
			if s and s:FindFirstChild("Motors") and s.Motors:FindFirstChild("Tilt") then
				return s
			end
			return nil
		end

		-- Helper: set one strobe's angle
		local function setAngle(name, angle)
			local s = getStrobe(name)
			if s then s.Motors.Tilt.DesiredAngle = angle end
		end

		-- Helper: check if still active
		local function alive()
			return currentActive == btn
		end

		--------------------------------------------
		-- PHASE 1: Sine Wave Ripple
		-- Each strobe follows a sine wave with a
		-- phase offset, creating a fluid ripple.
		--------------------------------------------
		local function phaseWave()
			local elapsed = 0
			while alive() and elapsed < 6 do
				for i, name in ipairs(names) do
					local wave = math.sin(elapsed * 3 + (i - 1) * 0.8)
					setAngle(name, wave * 1.2)
				end
				task.wait(0.05)
				elapsed += 0.05
			end
		end

		--------------------------------------------
		-- PHASE 2: Breathing Converge / Diverge
		-- Outer strobes tilt inward, inner strobes
		-- tilt outward, then reverse — like lungs.
		--------------------------------------------
		local function phaseBreath()
			local offsets = { 1.5, 1.0, 0.5, 0.2, -0.2, -0.5, -1.0, -1.5 }
			local elapsed = 0
			while alive() and elapsed < 5 do
				local breath = math.sin(elapsed * 2)
				for i, name in ipairs(names) do
					setAngle(name, offsets[i] * breath)
				end
				task.wait(0.05)
				elapsed += 0.05
			end
		end

		--------------------------------------------
		-- PHASE 3: Sequential Chase
		-- One strobe tilts dramatically while the
		-- rest stay flat — like a running spotlight.
		--------------------------------------------
		local function phaseChase()
			for _round = 1, 2 do
				if not alive() then return end
				-- Forward
				for i, name in ipairs(names) do
					if not alive() then return end
					ForAll(function(xs) xs.Motors.Tilt.DesiredAngle = 0 end)
					setAngle(name, -1.4)
					task.wait(0.18)
				end
				-- Reverse
				for i = #names, 1, -1 do
					if not alive() then return end
					ForAll(function(xs) xs.Motors.Tilt.DesiredAngle = 0 end)
					setAngle(names[i], 1.4)
					task.wait(0.18)
				end
			end
		end

		--------------------------------------------
		-- PHASE 4: Dramatic Sync Pulses
		-- All strobes snap together in big dramatic
		-- movements with pauses for impact.
		--------------------------------------------
		local function phasePulse()
			local seq = { 1.575, -1.575, 0, 0.75, -0.75, 1.575, 0 }
			for _, angle in ipairs(seq) do
				if not alive() then return end
				ForAll(function(xs)
					xs.Motors.Tilt.DesiredAngle = angle
				end)
				task.wait(0.45)
			end
		end

		--------------------------------------------
		-- PHASE 5: Controlled Chaos
		-- Each strobe gets a random angle, updated
		-- rapidly for an energetic chaotic look.
		--------------------------------------------
		local function phaseChaos()
			local elapsed = 0
			while alive() and elapsed < 4 do
				for _, name in ipairs(names) do
					local rng = (math.random() * 3.15) - 1.575
					setAngle(name, rng)
				end
				task.wait(0.15)
				elapsed += 0.15
			end
		end

		--------------------------------------------
		-- PHASE 6: Mexican Wave (smooth cascade)
		-- A smooth sine travels across all strobes
		-- with a long wavelength — elegant & clean.
		--------------------------------------------
		local function phaseMexican()
			local elapsed = 0
			while alive() and elapsed < 5 do
				for i, name in ipairs(names) do
					local t = elapsed * 2 - (i - 1) * 0.45
					local a = math.sin(t) * 1.4
					setAngle(name, a)
				end
				task.wait(0.04)
				elapsed += 0.04
			end
		end

		--------------------------------------------
		-- MAIN LOOP: cycle through all phases
		--------------------------------------------
		while alive() do
			phaseWave()
			if not alive() then break end
			phaseBreath()
			if not alive() then break end
			phaseChase()
			if not alive() then break end
			phasePulse()
			if not alive() then break end
			phaseChaos()
			if not alive() then break end
			phaseMexican()
		end

		-- Clean up: reset all tilts when show ends
		ForAll(function(xs)
			xs.Motors.Tilt.DesiredAngle = 0
		end)
	end)
end)

--------------------------------------------------
-- P2
--------------------------------------------------

script.Parent.P2.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P2) then return end

	ForAll(function(xs)
		xs.Motors.Tilt.DesiredAngle = -0.75
	end)
end)

--------------------------------------------------
-- P3
--------------------------------------------------

script.Parent.P3.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P3) then return end

	ForAll(function(xs)
		xs.Motors.Tilt.DesiredAngle = -1.575
	end)
end)

--------------------------------------------------
-- P4
--------------------------------------------------

script.Parent.P4.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P4) then return end

	ForAll(function(xs)
		local map = {
			S1 = 0.75, S8 = 0.75,
			S2 = 0.25, S7 = 0.25,
			S3 = -0.25, S6 = -0.25,
			S4 = -0.75, S5 = -0.75
		}

		if map[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = map[xs.Name]
		end
	end)
end)

--------------------------------------------------
-- P5
--------------------------------------------------

script.Parent.P5.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P5) then return end

	ForAll(function(xs)
		local groupA = {S1=true,S3=true,S6=true,S8=true}
		local groupB = {S2=true,S4=true,S5=true,S7=true}

		if groupA[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = 0.75
		end

		if groupB[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = -0.75
		end
	end)
end)

--------------------------------------------------
-- P6
--------------------------------------------------

script.Parent.P6.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P6) then return end

	ForAll(function(xs)
		local top = {S1=true,S2=true,S3=true,S4=true}
		local bottom = {S5=true,S6=true,S7=true,S8=true}

		if top[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = -0.75
		end

		if bottom[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = 0.75
		end
	end)
end)

--------------------------------------------------
-- P7
--------------------------------------------------

script.Parent.P7.MouseButton1Click:Connect(function()
	if not ActivateButton(script.Parent.P7) then return end

	ForAll(function(xs)
		local top = {S1=true,S2=true,S3=true,S4=true}
		local bottom = {S5=true,S6=true,S7=true,S8=true}

		if top[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = -1.575
		end

		if bottom[xs.Name] then
			xs.Motors.Tilt.DesiredAngle = 1.575
		end
	end)
end)

--------------------------------------------------
-- RANDOM MOVE TOGGLE
--------------------------------------------------

local MoveButton = script.Parent.Move
local MoveActive = false

MoveButton.MouseButton1Click:Connect(function()
	MoveActive = not MoveActive

	if MoveActive then
		MoveButton.BackgroundColor3 = COLOR_ON
		script.Parent.RandMoveS.Enabled = true
	else
		MoveButton.BackgroundColor3 = COLOR_OFF
		script.Parent.RandMoveS.Enabled = false

		ForAll(function(xs)
			xs.Motors.Tilt.DesiredAngle = 0
		end)
	end
end)

--------------------------------------------------
-- SPEED BUTTONS
--------------------------------------------------

script.Parent.S1.MouseButton1Click:Connect(function()
	ForAll(function(xs)
		xs.Motors.Tilt.MaxVelocity = 0.005
	end)
end)

script.Parent.S2.MouseButton1Click:Connect(function()
	ForAll(function(xs)
		xs.Motors.Tilt.MaxVelocity = 0.015
	end)
end)

script.Parent.S3.MouseButton1Click:Connect(function()
	ForAll(function(xs)
		xs.Motors.Tilt.MaxVelocity = 0.025
	end)
end)
