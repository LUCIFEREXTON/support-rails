module BlogVault
	class Error < StandardError
		def initialise(msg)
			super(msg)
		end
	end
end
